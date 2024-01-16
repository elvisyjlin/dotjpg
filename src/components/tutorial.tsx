import { FC } from "react";

type CardProps = {
  step: number;
  content: string;
};

const Card: FC<CardProps> = ({ step, content }) => (
  <div className="sm:w-[200px] p-4 border border-slate-400 rounded-lg text-center">
    <div className="text-slate-400 font-bold border-2 border-slate-400 rounded-full h-8 w-8 mx-auto flex justify-center items-center">{step}</div>
    <div className="mt-2">{content}</div>
  </div>
);

const Tutorial: FC = () => (
  <div className="mt-16 mb-16 container mx-auto hidden sm:block">
    <h2 className="text-xl font-semibold text-center">How to save photos and videos?</h2>
    <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center">
      <Card step={1} content="Copy the URL" />
      <Card step={2} content="Paste the link" />
      <Card step={3} content={`Click "Download"`} />
    </div>
  </div>
);

export default Tutorial;