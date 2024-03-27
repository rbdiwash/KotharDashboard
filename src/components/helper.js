export const ImageName = (text) => {
  const splittedText = text?.split(" ");
  return (
    text && (
      <span className="font-bold uppercase text-xl rounded-full bg-gray-300 p-2">
        {splittedText
          ?.map((word) => word.charAt(0))
          .join("")
          .slice(0, 2)}
      </span>
    )
  );
};
