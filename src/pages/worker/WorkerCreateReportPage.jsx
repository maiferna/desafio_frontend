import { useParams } from "react-router";
import { CreateReportForm } from "../../components/workers/CreateReportForm";





export const WorkerCreateReportPage = () => {
  const { id } = useParams();
  return (
    <main>
      <CreateReportForm id={id} />

    </main>
  )
}