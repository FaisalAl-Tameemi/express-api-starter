

function doSomething() {
  console.log('This is a helper function call.');
}

function doSomethingAsync() {
  return new Promise((() => {
    // pretend to do something that takes unknown time length / async with setTimeout
    setTimeout(() => {
      console.log('This is an async helper log message.');
      resolve({ async_data_resp: [1, 2, 3] });
      // -- OR --
      // reject({message: 'Some async error happener'});
      // which would invoke the .fail() of the promise
    }, 2000);
  }));
}

module.exports = {
  doSomething,
  doSomethingAsync,
};
