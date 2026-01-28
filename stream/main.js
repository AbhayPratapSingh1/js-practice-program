const modifyData = (text) => {
  const modified = text.slice(0, text.length - 1) + " <===";
  return modified;
};

const transformer = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(modifyData(chunk));
  },
});

const capitaliseWord = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};
const toCapitalise = (sentence) => {
  return sentence.split(" ").map(capitaliseWord)
    .join(" ");
};

const capitalizeTransformer = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.split("\n").map(capitaliseWord).join("\n"));
  },
});

const firstWordTransformer = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(
      chunk.split("\n").map((each) => each.split(" ")[0]).join("\n"),
    );
  },
});

(await Deno.open("./data.txt", { read: true }))
  .readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(transformer)
  .pipeThrough(capitalizeTransformer)
  .pipeThrough(firstWordTransformer)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable);
