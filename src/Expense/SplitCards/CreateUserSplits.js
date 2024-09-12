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


    const SplitComponent = splitTyprComponenets[splitType];
  return (
   <>
    <SplitComponent splitList={splitList} setSplitList={setSplitList}  totalAmount={totalAmount} />

   </>
  )
}

export default CreateUserSplits
