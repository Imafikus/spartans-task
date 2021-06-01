import { getIngredient } from './db';


export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   


async function main() {
  while (true) {
    const res = await getIngredient();
    console.log(res);
    await sleep(1000);
  }  
}

main().catch((e) => console.error(e));