import { Box } from "@mui/material";
import { CONFIG } from "src/config-global";
import { PublicHeader } from "../components/home/public-header";

export const metadata = { title: CONFIG.appName, description: CONFIG.description };

export default function Page() {
  return (
    <Box>
      <PublicHeader />
      
    </Box>
  );
}
