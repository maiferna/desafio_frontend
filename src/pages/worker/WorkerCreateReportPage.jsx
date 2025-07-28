import { useParams } from "react-router";
import { CreateReportForm } from "../../components/workers/CreateReportForm";





export const WorkerCreateReportPage = () => {
  const { id } = useParams();
  return (
    <main className="my-5 py-5">
      <CreateReportForm id={id} />

    </main>
  )
}