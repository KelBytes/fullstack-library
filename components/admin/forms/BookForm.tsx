"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { FIELD_TYPES } from "@/constants";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "../ColorPicker";
import { createBook, updateBook } from "@/lib/admin/actions/book";
import { toast } from "@/hooks/use-toast";

// This file defines the BookForm component used for creating or updating book details.
interface Props extends Partial<Book> {
  type?: "create" | "update";
}

// The BookForm component accepts a type prop to determine if it's for creating or updating a book.
// It also accepts various book properties as props to pre-fill the form fields when updating a book
const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();

  // Initialize the form with the book schema and default values based on the book prop
  // If the type is "create", it initializes with empty values, otherwise it uses the book details
  // The form uses zod for validation through the zodResolver
  // The form fields include title, author, genre, rating, totalCopies, coverUrl, coverColor, description, videoUrl, and summary
  // Each field is rendered with appropriate input types and validation messages
  // The form submission is handled by the onSubmit function, which calls the createBook or updateBook server actions based on the type prop
  // If the submission is successful, it redirects to the book details page with a success message
  // If there's an error, it displays an error message using the toast component
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book.title ? book.title : "",
      description: book.description ? book.description : "",
      author: book.author ? book.author : "",
      genre: book.genre ? book.genre : "",
      rating: book.rating ? (book.rating as unknown as number) : 1,
      totalCopies: book.totalCopies
        ? (book.totalCopies as unknown as number)
        : 1,
      coverUrl: book.coverUrl ? book.coverUrl : "",
      coverColor: book.coverColor ? book.coverColor : "",
      videoUrl: book.videoUrl ? book.videoUrl : "",
      summary: book.summary ? book.summary : "",
    },
  }); //Define form schema

  //Handle submitted form values and call createBook server action with data
  const onSubmit = async (data: z.infer<typeof bookSchema>) => {
    let result;

    if (type === "create") {
      result = await createBook(data);
    } else if (type === "update") {
      result = await updateBook(data, book.id);
    }

    if (result?.success) {
      toast({
        title: "Success",
        description:
          type === "create"
            ? "Book added successfully"
            : "Book updated successfully",
      });

      router.push(`/admin/books/${result?.data.id}`);
    } else {
      toast({
        title: "Error",
        description: result?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Title{" "}
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                  {...field}
                  className="book-form_input"
                  placeholder="Enter book title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                  {...field}
                  className="book-form_input"
                  placeholder="Book Author"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                  {...field}
                  className="book-form_input"
                  placeholder="Category"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  min={1}
                  max={5}
                  {...field}
                  className="book-form_input"
                  placeholder="Book Rating"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Total Copies
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  min={1}
                  max={10000}
                  {...field}
                  className="book-form_input"
                  placeholder="Enter book title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Image
              </FormLabel>
              <FormControl>
                <FileUpload
                  onFileChange={field.onChange}
                  placeholder="Upload book cover image"
                  type="image"
                  accept="image/*"
                  folder="books/covers"
                  variant="light"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Primary Color
              </FormLabel>
              <FormControl>
                <ColorPicker
                  value={field.value}
                  onPickerChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book description"
                  {...field}
                  rows={10}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Trailer
              </FormLabel>
              <FormControl>
                <FileUpload
                  onFileChange={field.onChange}
                  placeholder="Upload a book trailer"
                  type="video"
                  accept="video/*"
                  folder="books/videos"
                  variant="light"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book summary"
                  {...field}
                  rows={5}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white">
          {type === "create" ? "Add Book to Library" : "Update Book"}
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
