import React from 'react'
import ActivityList from './ActivityList'
import ActivityBar from './ActivityBar';

const Activity = () => {
  return (
    <>
      <ActivityBar />
      <ActivityList showEditButton={true} />
    </>

  )
}

export default Activity;
