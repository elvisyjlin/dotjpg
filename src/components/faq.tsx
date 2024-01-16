import { FC } from "react";

const FAQData = [
  {
    question: "What is \".jpg\"?",
    answer: "\".jpg\" (pronounced as \"dotjpg\") is a downloader for Twitter, Instagram and Threads. It may support more platforms in the future."
  },
  {
    question: "How to use this tool?",
    answer: "Just paste the link of the post you want to download, and click \"Download\"."
  },
  {
    question: "How to download high quality photos or videos?",
    answer: "\".jpg\" automatically selects the highest quality available. They are displayed directly on the result page, so you can save them easily.",
  },
];

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem: FC<FAQItemProps> = ({ question, answer }) => (
  <div className="mt-6 sm:mt-8 mx-auto max-w-[630px]">
    <h3 className="text-base font-medium">{question}</h3>
    <p className="mt-2 text-sm text-slate-500">{answer}</p>
  </div>
);

type FAQProps = {
  platform?: string;
};

const FAQ: FC<FAQProps> = () => (
  <div className="mt-16 container mx-auto">
    <h2 className="text-xl font-semibold text-center">Frequently asked questions - FAQ</h2>
    {FAQData.map((item, index) => (
      <FAQItem key={index} question={item.question} answer={item.answer} />
    ))}
  </div>
);

export default FAQ;