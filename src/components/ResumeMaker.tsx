
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PlusIcon, TrashIcon, DownloadIcon, UploadIcon } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  objective: string;
  education: Education[];
  experience: Experience[];
  skills: string;
  projects: Project[];
}

const ResumeMaker: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, USA",
    },
    objective: "Dedicated professional seeking a position where I can utilize my skills and experience to contribute to company growth.",
    education: [
      {
        id: "edu1",
        institution: "University of Example",
        degree: "Bachelor of Science in Computer Science",
        year: "2018-2022",
      },
    ],
    experience: [
      {
        id: "exp1",
        company: "Tech Solutions Inc.",
        position: "Software Developer",
        duration: "2022-Present",
        description: "Developed and maintained web applications using React, Node.js, and MongoDB.",
      },
    ],
    skills: "JavaScript, React, TypeScript, Node.js, HTML/CSS, Git, Agile, Problem Solving",
    projects: [
      {
        id: "proj1",
        title: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform with user authentication, product management, and payment processing.",
      },
    ],
  });
  
  const resumeRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const updatePersonalInfo = (field: keyof typeof resumeData.personalInfo, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };
  
  const updateObjective = (value: string) => {
    setResumeData({ ...resumeData, objective: value });
  };
  
  const updateSkills = (value: string) => {
    setResumeData({ ...resumeData, skills: value });
  };
  
  const addEducation = () => {
    const newEducation: Education = {
      id: `edu${Date.now()}`,
      institution: "",
      degree: "",
      year: "",
    };
    
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
  };
  
  const updateEducation = (id: string, field: keyof Omit<Education, 'id'>, value: string) => {
    const updatedEducation = resumeData.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };
  
  const removeEducation = (id: string) => {
    const updatedEducation = resumeData.education.filter((edu) => edu.id !== id);
    
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };
  
  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp${Date.now()}`,
      company: "",
      position: "",
      duration: "",
      description: "",
    };
    
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience],
    });
  };
  
  const updateExperience = (id: string, field: keyof Omit<Experience, 'id'>, value: string) => {
    const updatedExperience = resumeData.experience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };
  
  const removeExperience = (id: string) => {
    const updatedExperience = resumeData.experience.filter((exp) => exp.id !== id);
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };
  
  const addProject = () => {
    const newProject: Project = {
      id: `proj${Date.now()}`,
      title: "",
      description: "",
    };
    
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    });
  };
  
  const updateProject = (id: string, field: keyof Omit<Project, 'id'>, value: string) => {
    const updatedProjects = resumeData.projects.map((proj) =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };
  
  const removeProject = (id: string) => {
    const updatedProjects = resumeData.projects.filter((proj) => proj.id !== id);
    
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };
  
  const handleDownload = async () => {
    if (!resumeRef.current) return;
    
    try {
      toast.info("Preparing PDF...");
      
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");
      
      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };
  
  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        if (
          jsonData &&
          jsonData.personalInfo &&
          jsonData.education &&
          jsonData.experience &&
          jsonData.skills &&
          jsonData.projects
        ) {
          setResumeData(jsonData);
          toast.success("Resume data imported successfully");
        } else {
          toast.error("Invalid JSON format");
        }
      } catch (error) {
        toast.error("Error parsing JSON file");
        console.error(error);
      }
    };
    reader.readAsText(file);
    
    // Reset the input value to allow importing the same file again
    event.target.value = "";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Resume Maker</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleImport}>
            <UploadIcon className="w-4 h-4 mr-2" />
            Import JSON
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editor Column */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo("name", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Input
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <Input
                  value={resumeData.personalInfo.address}
                  onChange={(e) => updatePersonalInfo("address", e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Career Objective</h3>
            <Textarea
              className="min-h-[100px]"
              value={resumeData.objective}
              onChange={(e) => updateObjective(e.target.value)}
            />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Education</h3>
              <Button variant="ghost" size="sm" onClick={addEducation}>
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Education
              </Button>
            </div>
            
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="p-4 border border-gray-200 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">Education Entry</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-red-600"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree
                    </label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <Input
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
              <Button variant="ghost" size="sm" onClick={addExperience}>
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Experience
              </Button>
            </div>
            
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="p-4 border border-gray-200 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">Experience Entry</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-red-600"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
            <Textarea
              className="min-h-[100px]"
              value={resumeData.skills}
              onChange={(e) => updateSkills(e.target.value)}
              placeholder="Enter skills separated by commas (e.g. JavaScript, React, CSS)"
            />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Projects</h3>
              <Button variant="ghost" size="sm" onClick={addProject}>
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Project
              </Button>
            </div>
            
            {resumeData.projects.map((proj) => (
              <div key={proj.id} className="p-4 border border-gray-200 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">Project Entry</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-red-600"
                    onClick={() => removeProject(proj.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <Input
                      value={proj.title}
                      onChange={(e) => updateProject(proj.id, "title", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Textarea
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Preview Column */}
        <div>
          <div className="sticky top-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resume Preview</h3>
              <div
                ref={resumeRef}
                className="text-sm border border-gray-200 rounded-lg p-6 bg-white"
                style={{ minHeight: "800px" }}
              >
                {/* Header */}
                <div className="border-b-2 border-gray-900 pb-4 mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {resumeData.personalInfo.name}
                  </h1>
                  <div className="flex flex-wrap gap-3 mt-2 text-gray-600">
                    <div>{resumeData.personalInfo.email}</div>
                    <div>{resumeData.personalInfo.phone}</div>
                    <div>{resumeData.personalInfo.address}</div>
                  </div>
                </div>
                
                {/* Objective */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Objective</h2>
                  <p className="text-gray-700">{resumeData.objective}</p>
                </div>
                
                {/* Education */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Education</h2>
                  <div className="space-y-3">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="font-medium text-gray-900">{edu.institution}</div>
                        <div className="flex justify-between text-gray-700">
                          <div>{edu.degree}</div>
                          <div>{edu.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Experience */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Work Experience</h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="font-medium text-gray-900">{exp.company}</div>
                        <div className="flex justify-between text-gray-700">
                          <div>{exp.position}</div>
                          <div>{exp.duration}</div>
                        </div>
                        <p className="text-gray-600 mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Skills */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Skills</h2>
                  <p className="text-gray-700">{resumeData.skills}</p>
                </div>
                
                {/* Projects */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Projects</h2>
                  <div className="space-y-3">
                    {resumeData.projects.map((proj) => (
                      <div key={proj.id}>
                        <div className="font-medium text-gray-900">{proj.title}</div>
                        <p className="text-gray-600 mt-1">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeMaker;
