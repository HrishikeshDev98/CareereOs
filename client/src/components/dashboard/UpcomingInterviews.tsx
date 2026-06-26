import JobApplicationCard, {
  type JobApplication,
} from '@/src/components/dashboard/JobApplicationCard'

const UpcomingInterviews = ({
  interviews,
}: {
  interviews?: { application: JobApplication }[]
}) => {
  return (
    <>
      <h3>Uppoming interviews</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interviews?.map((int, index) => (
          <JobApplicationCard key={index} interviewDetails={int} application={int?.application} />
        ))}
      </div>
    </>
  )
}

export default UpcomingInterviews
