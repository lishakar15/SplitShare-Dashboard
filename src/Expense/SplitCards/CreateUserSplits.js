import React from 'react'
import EqualSplitCard from './EqualSplitCard';
import PercentageSplitCard from './PercentageSplitCard';
import SharesSplitCard from './SharesSplitCard';
import AdjustmentSplitCard from './AdjustmentSplitCard';
import ManualSplitCard from './ManualSplitCard';

const splitTyprComponenets ={
    Equal:EqualSplitCard,
    Percentage:PercentageSplitCard,
    Shares:SharesSplitCard,
    Adjustment:AdjustmentSplitCard,
    Manual:ManualSplitCard
}

const CreateUserSplits = ({splitList,setSplitList,totalAmount,splitType}) => {

    const handleUserCardDelete = (deleteUserID)=>{
        setSplitList(splitList.filter((user)=>user.userId !== deleteUserID))
    }

    const SplitComponent = splitTyprComponenets[splitType];
  return (
   <>
    <SplitComponent splitList={splitList} setSplitList={setSplitList} handleUserCardDelete={handleUserCardDelete} totalAmount={totalAmount} />

   </>
  )
}

export default CreateUserSplits
