import { FC } from "react";

type CardProps = {
  step: number;
  content: string;
};

const Card: FC<CardProps> = ({ step, content }) => (
  <div className="sm:w-[200px] sm:p-4 sm:border sm:border-slate-400 rounded-lg text-center ml-7 sm:ml-0 flex flex-row sm:flex-col items-center gap-4 sm:gap-2 justify-start">
    <div className="text-slate-300 font-bold border-2 border-slate-300 rounded-full h-6 w-6 sm:h-8 sm:w-8 flex justify-center items-center">{step}</div>
    <div className="">{content}</div>
  </div>
);

const Tutorial: FC = () => (
  <div className="mt-12 mb-16 container mx-auto">
    <h2 className="text-xl font-semibold text-center">How to use it?</h2>
    <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center">
      <Card step={1} content="Copy the URL" />
      <Card step={2} content="Paste the link" />
      <Card step={3} content={`Click "Download"`} />
    </div>
  </div>
);

export default Tutorial;