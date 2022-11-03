import { Box, Button, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState();
  const [loadingChat, setloadingChat] = useState();
  return (
    <div>
      <Box>
        <Tooltip label="search users" hasArrow placement="bottom-end">
          <Button variant={"ghost"}>
            <i class="fa fa-search" aria-hidden="true"></i>
          </Button>
        </Tooltip>
      </Box>
    </div>
  );
};

export default SideDrawer;
