export const ImageName = (text) => {
  const splittedText = text?.split(" ");
  return (
    text && (
      <span className="font-bold uppercase text-xl rounded-full bg-gray-300 w-10 p-2  text-center">
        {splittedText
          ?.map((word) => word.charAt(0))
          .join("")
          .slice(0, 2)}
      </span>
    )
  );
};
