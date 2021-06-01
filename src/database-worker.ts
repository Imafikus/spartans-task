import { getIngredient } from './db';


export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   


async function main() {
  while (true) {
    // sleep(1000).then(() => console.log('kurcinela'));
    // getIngredient().then((res) => {
    //   console.log("response");
    //   console.log(res);
    // });
    const res = await getIngredient();
    console.log(res);
    await sleep(1000);
    // .then((res) => {
    //   console.log('Kuronjero');
    //   sleep(1000).then(() => {});
    // });
  }  
}

main().catch((e) => console.error(e));