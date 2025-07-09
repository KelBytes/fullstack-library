import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[160px] bg-[#232839] border-none text-primary font-bold font-ibm-plex-sans">
        <p className="text-white font-light">Filter by:</p>
        <SelectValue placeholder="None" />
      </SelectTrigger>
      <SelectContent className="text-white border-none bg-[#232839]">
        <SelectGroup>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="dark">Genre</SelectItem>
          <SelectItem value="system">Author</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Filter;
