const mongoose = require('mongoose');

const DetailsByIDService = async (Request, DataModel) => {
  try {
    const DetailsID = Request.params.id;
//    const UserEmail = Request.headers.email;
debugger;
    const { ObjectId } = mongoose.Types;
    const QueryObject = { _id: DetailsID};
debugger;
    const data = await DataModel.aggregate([
      { $match: QueryObject }
    ]);
    debugger;
    return { status: 'success', data:data };
  } catch (error) {
    debugger;
    return { status: 'fail', data: error };
  }
};
module.exports = DetailsByIDService;
