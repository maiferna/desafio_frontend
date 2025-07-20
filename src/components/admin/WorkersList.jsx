import React from 'react'


export const WorkersList = () => {
  return (
    <section className='my-5 pb-5 mx-5'>
        <h3 className="fw-bold my-4 px-sm-1 px-md-0">Lista de operarios</h3>
        <div className="d-flex row g-0 mb-5">
            <WorkerRow/>
            <WorkerRow/>
            <WorkerRow/>
            <WorkerRow/>
            <WorkerRow/>
        </div>
    </section>
  )
}