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
      <SelectTrigger className="select-trigger">
        <p className="text-white font-light">Filter by:</p>
        <SelectValue placeholder="None" />
      </SelectTrigger>
      <SelectContent className="select-content">
        <SelectGroup>
          <SelectItem value="none" className="select-item">
            None
          </SelectItem>
          <SelectItem value="title" className="select-item">
            Title
          </SelectItem>
          <SelectItem value="genre" className="select-item">
            Genre
          </SelectItem>
          <SelectItem value="author" className="select-item">
            Author
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Filter;
