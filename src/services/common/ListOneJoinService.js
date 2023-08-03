const ListOneJoinService = async (Request, DataModel, SearchArray, JoinStage) => {
  try {
    let pageNo = Number(Request.params.pageNo);
    let perPage = Number(Request.params.perPage);
    let searchValue = Request.params.searchKeyword;
    let skipRow = (pageNo - 1) * perPage;
    debugger;
    let data;
    if (searchValue !== '0') {
      data = await DataModel.aggregate([
        JoinStage,
        { $match: { $or: SearchArray } },
        {
          $facet: {
            Total: [{ $count: 'count' }],
            Rows:[{$skip: skipRow}, {$limit: perPage}]
          },
        },
      ]);
      debugger;
    } else {
      data = await DataModel.aggregate([
        JoinStage,
        {
          $facet: {
            Total: [{ $count: 'count' }],
            Rows:[{$skip: skipRow}, {$limit: perPage}]
          },
        },
      ]);
      debugger;
    }
    debugger;
    return { status: 'success', data };
  } catch (error) {
    debugger;
    return { status: 'fail', data: error };
  }
};

module.exports = ListOneJoinService;
