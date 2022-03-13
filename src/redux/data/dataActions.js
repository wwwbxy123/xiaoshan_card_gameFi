// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let allCards = await store
        .getState()
        .blockchain.xiaoshanToken.methods.getCards()
        .call();
      let allOwnerCards = await store
        .getState()
        .blockchain.xiaoshanToken.methods.getOwnerCards(account)
        .call();

      dispatch(
        fetchDataSuccess({
          allCards,
          allOwnerCards,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
