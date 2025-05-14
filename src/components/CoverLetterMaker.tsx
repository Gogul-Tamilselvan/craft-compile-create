
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CopyIcon } from "lucide-react";

const CoverLetterMaker: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [coverLetter, setCoverLetter] = useState(`Dear Hiring Manager,

I'm excited to apply for the [Job Title] position at [Company Name]. I'm Gogul Tamilselvan, a web developer with 1 year of experience building scalable, responsive, and user-friendly applications.

Currently, I work on enterprise-level university portals, maintaining and enhancing student exam modules for Gurugram University and Chaudhary Charan Singh University. My day-to-day involves working with Java, JSP, Liferay, and PostgreSQL to deliver high-performing, accessible systems used by thousands of students.

Alongside my professional role, I've built several personal and freelance projects that reflect both my technical and creative strengths. These include:

DigitalMoi – a platform that digitizes traditional community savings systems.

Message Application – a real-time chat app using Firebase and React.

Linkbloom – a link-sharing platform with clean UI and fast performance.

Plus, multiple freelance projects where I handled everything from planning to deployment.


Technically, I'm skilled in React, Redux, Node.js, Express.js, REST APIs, and frontend testing with Jest and React Testing Library. I also bring strong design capabilities, with experience in UI design, wireframing, and prototyping using tools like Figma, Photoshop, and Illustrator.

I'm looking for an opportunity where I can contribute my full-stack knowledge and creative thinking while continuing to grow alongside a talented team. I'd love to bring this energy and experience to [Company Name].

Thank you for considering my application. I look forward to the opportunity to connect further.

Warm regards,
Gogul Tamilselvan. 

Linkedin: https://www.linkedin.com/in/gogul-tamilselvan
Portfolio: gogultamilselvan.vercel.app`);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const generateCoverLetter = () => {
    if (!companyName || !position) {
      toast({
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedLetter = coverLetter
      .replace(/\[Job Title\]/g, position)
      .replace(/\[Company Name\]/g, companyName);
    
    setCoverLetter(updatedLetter);
    
    toast({
      description: "Cover letter generated"
    });
  };
  
  const resetForm = () => {
    setCoverLetter(`Dear Hiring Manager,

I'm excited to apply for the [Job Title] position at [Company Name]. I'm Gogul Tamilselvan, a web developer with 1 year of experience building scalable, responsive, and user-friendly applications.

Currently, I work on enterprise-level university portals, maintaining and enhancing student exam modules for Gurugram University and Chaudhary Charan Singh University. My day-to-day involves working with Java, JSP, Liferay, and PostgreSQL to deliver high-performing, accessible systems used by thousands of students.

Alongside my professional role, I've built several personal and freelance projects that reflect both my technical and creative strengths. These include:

DigitalMoi – a platform that digitizes traditional community savings systems.

Message Application – a real-time chat app using Firebase and React.

Linkbloom – a link-sharing platform with clean UI and fast performance.

Plus, multiple freelance projects where I handled everything from planning to deployment.


Technically, I'm skilled in React, Redux, Node.js, Express.js, REST APIs, and frontend testing with Jest and React Testing Library. I also bring strong design capabilities, with experience in UI design, wireframing, and prototyping using tools like Figma, Photoshop, and Illustrator.

I'm looking for an opportunity where I can contribute my full-stack knowledge and creative thinking while continuing to grow alongside a talented team. I'd love to bring this energy and experience to [Company Name].

Thank you for considering my application. I look forward to the opportunity to connect further.

Warm regards,
Gogul Tamilselvan. 

Linkedin: https://www.linkedin.com/in/gogul-tamilselvan
Portfolio: gogultamilselvan.vercel.app`);
    setCompanyName("");
    setPosition("");
    
    toast({
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
          description: "Cover letter copied to clipboard"
        });
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        toast({
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
