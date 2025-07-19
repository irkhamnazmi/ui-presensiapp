import { Theme } from "@/models/Theme";
import axios from "axios";

const API_URL = 'https://tatawaktu.my.id/dummy/themes.json';

export const fetchTheme = async () => {
  const response = await axios.get(API_URL);
  
  return response.data.map(m => new Theme(m));
};