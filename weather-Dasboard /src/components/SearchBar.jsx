import { useEffect } from "react";

export default function SearchBar({ onSearch }) {

  useEffect(() => {
    onSearch("Pune");
  }, []);

  return null; 
}



