import ArgumentArena from "@/app/_components/argument/ArgumentArena";
import ArgumentHeader from "@/app/_components/argument/ArgumentHeader";
import type { ArgumentPageData } from "../types";
import ArgumentInput from "@/app/_components/argument/ArgumentInput";
import serverApi from "@/app/axios.server";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  let { id } = await params;

  id = id.split("-")[1]

  const {data} = await serverApi.get(`/argument/${+id}`)
  const comments = await serverApi.get(`/comment/${+id}`)
  // console.log(data)
  // console.log(comments.data.forComments)
  // console.log(comments.data.againstComments)

  const aiAnalysis: [string,string] = [data.data.for_analysis, data.data.against_analysis]

  const forCaseComments: any = []
  comments.data.forComments.forEach((e: {username: string; content: string; likes: number;}) =>{
    forCaseComments.push({
      side: "for",
      reputation: "master",
      username: e.username,
      grade: "A+",
      comment:
        e.content,
      likes: e.likes,
    })
  })
  const againstCaseComments: any = []
  comments.data.againstComments.forEach((e: {username: string; content: string; likes: number;}) =>{
    againstCaseComments.push({
      side: "against",
      reputation: "master",
      username: e.username,
      grade: "A+",
      comment:
        e.content,
      likes: e.likes,
    })
  })


  const argumentPageData: ArgumentPageData = {
    argumentHeaderData: {
      statementId: `CRX-${data.data.id}-A`,
      statement:
        `${data.data.content}`,
      statementKeyword: data.data.content_keyword,
      affirmativeProbability: data.data.affirmative,
      negativeProbability: data.data.negative,
    },
    argumentArenaData: {
      forArgumentsCount: forCaseComments.length,
      againstArgumentsCount: againstCaseComments.length,
      forCaseComments: forCaseComments,
      againstCaseComments: againstCaseComments
    },
  };

  return (
    <>
      <div className="absolute inset-0 perspective-grid -z-10 pointer-events-none"></div>
      <section className="max-w-screen-2xl mx-auto px-6 pt-12 pb-16">
        <ArgumentHeader
          argumentHeaderData={argumentPageData.argumentHeaderData}
        />
        <ArgumentArena aiAnalysis={aiAnalysis} argumentArenaData={argumentPageData.argumentArenaData} />

        <ArgumentInput argumentId={+id}/>

      </section>
    </>
  );
};

export default page;
