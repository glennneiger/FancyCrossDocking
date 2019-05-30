import { isFetching, dispatch, stopDispatch } from './Utils';
// import RNFetchBlob from 'react-native-fetch-blob'

export default {
  composeUrl(url, data) {
    Object.keys(data).map((key, index) => {
      url = index == 0 ? `${url}?` : `${url}&`;
      url = `${url + key}=${data[key]}`;
    });
    return url;
  },

  // postBinaryData(url, data, callback){
  //   RNFetchBlob
  //     .fetch('POST', url, {
  //       Authorization: 'Bearer access-token',
  //       otherHeader: 'foo',
  //       'Content-Type': 'multipart/form-data',
  //     }, [
  //       {
  //         name: 'data-logs',
  //         data: JSON.stringify(data),
  //       },
  //     ])
  //     .then(response => response.json())
  //     .then(callback())
  //     .catch(callback());
  // },

  post(url, data) {
    // console.log('..........url', JSON.stringify(url));
    // console.log('..........data', JSON.stringify(data));

    if (isFetching(url)) {
      return Promise.resolve({
        success: false,
        error: 1,
        text: 'is fetching',
      });
    }
    dispatch(url);

    return Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
      new Promise((resolve, reject) => setTimeout(() => reject({
        result: {
          success: false,
          error: 0,
          errorText: 'timeout',
        },
      }), 30000)), // 30000
    ])
      .then(async response => response.json())
      .then(async (res) => {
        // console.log('..........result', JSON.stringify(res));
        stopDispatch(url);
        if (!res.result) {
          return {
            success: false,
            error: 100,
            errorText: `Qualcosa ${String.fromCharCode(232)} andato storto`,
          };
        }
        return res.result;
      })
      .catch(async (error) => {
        // console.log('..........error', JSON.stringify(error));
        stopDispatch(url);
        if (!error.result) {
          return {
            success: false,
            error: 100,
            errorText: `Qualcosa ${String.fromCharCode(232)} andato storto`,
          };
        }
        return error.result;
      });
  },

  patch(url, data) {
    if (isFetching(url)) {
      return Promise.resolve({
        success: false,
        error: 1,
        text: 'is fetching',
      });
    }
    dispatch(url);

    return Promise.race([
      fetch(url, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
      new Promise((resolve, reject) => setTimeout(() => reject({
        result: {
          success: false,
          error: 0,
          errorText: 'timeout',
        },
      }), 30000)),
    ])
      .then(response => response.json())
      .then((res) => {
        stopDispatch(url);
        if (!res.result) {
          return {
            success: false,
            error: 100,
            errorText: `Qualcosa ${String.fromCharCode(232)} andato storto`,
          };
        }
        return res.result;
      })
      .catch((error) => {
        // console.log('...............fetchData-POST error: '+JSON.stringify(error));
        stopDispatch(url);
        return {
          success: false,
          error: 100,
          errorText: `Qualcosa ${String.fromCharCode(232)} andato storto`,
        };
      });
  },

  get(url) {
    if (isFetching(url)) {
      return Promise.resolve({
        success: false,
        error: 1,
        text: 'is fetching',
      });
    }
    dispatch(url);
    return Promise.race([
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
      new Promise((resolve, reject) => setTimeout(() => reject({
        result: {
          success: false,
          error: 0,
          errorText: 'timeout',
        },
      }), 30000)),
    ])
      .then(response => response.json())
      .then((res) => {
        stopDispatch(url);
        // console.log('...............fetchData-POST res: ', JSON.stringify(res));
        if (!res.result) {
          return {
            success: false,
            error: 100,
            errorText: `Qualcosa ${String.fromCharCode(232)} andato storto`,
          };
        }
        return res.result;
      })
      .catch((error) => {
        // console.log('...............fetchData-POST error: ', JSON.stringify(error));
        stopDispatch(url);
        return {
          success: false,
          error: 100,
          errorText: `Qualcosa ${String.fromCharCode(232)} andato storto`,
        };
      });
  },
};
