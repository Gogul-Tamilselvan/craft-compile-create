
import React, { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InfoTooltipProps {
  content: React.ReactNode;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Info className="h-4 w-4" />
          <span className="sr-only">Info</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-sm">
        <div className="text-sm">{content}</div>
      </PopoverContent>
    </Popover>
  );
};

export default InfoTooltip;
