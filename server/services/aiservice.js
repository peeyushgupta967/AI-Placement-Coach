const fs = require("fs");
const pdfParse = require("pdf-parse");
const ai = require("../config/gemini");


const extractResumeText = async (filePath) => {
    try {
        
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        return data.text;
    } catch (error) {

        

        throw error;

    }

};

const analyzeResume = async (resumeText) => {

const prompt = `
You are an experienced Software Engineer interviewer at Google, Microsoft, Amazon, Atlassian and Oracle.
Return all scores as integers between 0 and 100.
Today's date is ${new Date().toISOString().split("T")[0]}.

The candidate is applying for Software Engineering Internship roles.

Important Instructions:

1. Do NOT treat dates before today's date as future dates.
2. Evaluate the resume ONLY for internship hiring.
3. Do NOT penalize the candidate for having no internship and be genuine not so hard and soft.

4. Focus on:
- DSA
- Projects
- Resume Quality
- Web Development
- Backend Skills
- AI Skills
- ATS Optimization
5. Give constructive feedback.

Return ONLY valid JSON.

{
    "overallScore":0,
    "atsScore":0,
    "dsaScore":0,
    "developmentScore":0,
    "projectScore":0,
    "strengths":[],
    "weaknesses":[],
    "missingSkills":[],
    "projectSuggestions":[],
    "atsSuggestions":[],
    "roadmap":[],
    "interviewReadiness":""


Keep it concise and effective and helpful limit 100words for each section.
}

Resume:

${resumeText}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    let text = response.text;

    // Remove markdown code blocks
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    // Convert string to JS object
    return JSON.parse(text);

};

module.exports = {
    extractResumeText,
    analyzeResume
};