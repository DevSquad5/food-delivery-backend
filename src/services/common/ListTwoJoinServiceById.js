const ListTwoJoinServiceById = async (Request, DataModel, JoinStage1, JoinStage2) => {
  try {
    const { id } = Request.params;
    const data = await DataModel.aggregate([
      JoinStage1, JoinStage2, {
        $unwind: '$order',
      },
      {
        $group: {
          _id: `$order.info[0].${id}`,
          orders: { $push: '$order' },
        },
      },
    ]);
    return { status: 'success', data };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};
module.exports = ListTwoJoinServiceById;
