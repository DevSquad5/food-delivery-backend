const OneJoinDetailsByIdService = async (
  Request,
  DataModel,
  JoinStage,
) => {
  try {
    const { id } = Request.params;
    // debugger;
    const data = await DataModel.aggregate([
      JoinStage,
      { $match: { _id: id } },
      /* {
        $facet: {
          Total: [{ $count: 'count' }],
          Rows: [],
        },
      }, */
    ]);

    return { status: 'success', data };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};

module.exports = OneJoinDetailsByIdService;
