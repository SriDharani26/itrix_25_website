import { google } from "googleapis";
import { NextRequest } from "next/server";

type peopleType = {
    name: string;
    profile: string | undefined | null;
    image: string | undefined | null;
    domain : string
};

export async function GET(request: NextRequest) {

    const position = request.nextUrl.searchParams.get("position");

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            project_id: process.env.GOOGLE_PROJECT_ID
        },
        scopes: [
            "https://www.googleapis.com/auth/forms.responses.readonly",
            "https://www.googleapis.com/auth/drive.readonly"
        ],
    });

    const forms = google.forms({
        version: "v1",
        auth,
    });

    const response = await forms.forms.responses.list({
        formId: "1vCQfQEUDtpROqz7mYzICf2fFoYLJbk-JFhNL0TM828Y",
    });

    const people: peopleType[] = [];

    response.data.responses?.forEach((res) => {

    const answer = res.answers?.["33b6aa81"]?.textAnswers?.answers?.[0]?.value;

    if (
        answer &&
        position &&
        answer.toLowerCase() === position.toLowerCase()
    ) {

        const name = res.answers?.["39ceb3bb"]?.textAnswers?.answers?.[0]?.value;
        const profile = res.answers?.["452cfbde"]?.textAnswers?.answers?.[0]?.value;
        const fileId = res.answers?.["78502c0a"]?.fileUploadAnswers?.answers?.[0]?.fileId;
        const domain =  res.answers?.["7ea43680"]?.textAnswers?.answers?.[0]?.value;

        const image = fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : "";

        if(name && domain)
            people.push({
                name,
                profile,
                image,
                domain
            });
    }
    });

    return Response.json(people);
}