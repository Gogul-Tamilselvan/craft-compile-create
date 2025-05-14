
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";

const CoverLetterMaker: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [coverLetter, setCoverLetter] = useState(`
Dear Hiring Team,

I am writing to express my strong interest in the [POSITION] position at [COMPANY]. With my background in software development and passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

Throughout my career, I have developed a comprehensive skill set in full-stack development, with expertise in React, TypeScript, and modern web technologies. I have successfully delivered complex projects that required attention to detail, problem-solving abilities, and effective collaboration with cross-functional teams.

What particularly draws me to [COMPANY] is your commitment to creating impactful products and fostering a culture of innovation. I am impressed by your recent achievements in the industry and would be thrilled to be part of a team that values excellence and continuous improvement.

I am confident that my technical expertise, combined with my strong communication skills and collaborative approach, would make me a valuable addition to your team. I am eager to contribute to your ongoing projects and help drive your continued success.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences align with your needs.

Sincerely,
[Your Name]
  `.trim());
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const generateCoverLetter = () => {
    if (!companyName || !position) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedLetter = coverLetter
      .replace(/\[COMPANY\]/g, companyName)
      .replace(/\[POSITION\]/g, position);
    
    setCoverLetter(updatedLetter);
    
    toast({
      title: "Success",
      description: "Cover letter generated"
    });
  };
  
  const resetForm = () => {
    setCoverLetter(`
Dear Hiring Team,

I am writing to express my strong interest in the [POSITION] position at [COMPANY]. With my background in software development and passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

Throughout my career, I have developed a comprehensive skill set in full-stack development, with expertise in React, TypeScript, and modern web technologies. I have successfully delivered complex projects that required attention to detail, problem-solving abilities, and effective collaboration with cross-functional teams.

What particularly draws me to [COMPANY] is your commitment to creating impactful products and fostering a culture of innovation. I am impressed by your recent achievements in the industry and would be thrilled to be part of a team that values excellence and continuous improvement.

I am confident that my technical expertise, combined with my strong communication skills and collaborative approach, would make me a valuable addition to your team. I am eager to contribute to your ongoing projects and help drive your continued success.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences align with your needs.

Sincerely,
[Your Name]
    `.trim());
    setCompanyName("");
    setPosition("");
    
    toast({
      title: "Info",
      description: "Form has been reset"
    });
  };
  
  const copyToClipboard = () => {
    if (!textareaRef.current) return;
    
    textareaRef.current.select();
    document.execCommand('copy');
    // Modern clipboard API
    navigator.clipboard.writeText(textareaRef.current.value)
      .then(() => {
        toast({
          title: "Success",
          description: "Cover letter copied to clipboard"
        });
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Error",
          description: "Failed to copy to clipboard",
          variant: "destructive"
        });
      });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Cover Letter Maker</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Information</CardTitle>
            <CardDescription>
              Enter the job details to customize your cover letter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="position">Position/Role</Label>
              <Input
                id="position"
                placeholder="Software Engineer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Acme Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
            <Button onClick={generateCoverLetter}>
              Generate
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Cover Letter</CardTitle>
            <CardDescription>
              Preview and copy your customized cover letter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              ref={textareaRef}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[300px]"
            />
          </CardContent>
          <CardFooter>
            <Button 
              onClick={copyToClipboard}
              className="w-full"
              variant="default"
            >
              <CopyIcon className="w-4 h-4 mr-2" />
              Copy to Clipboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CoverLetterMaker;
