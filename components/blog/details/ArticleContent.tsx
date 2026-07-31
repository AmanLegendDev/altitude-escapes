"use client";

import { motion } from "framer-motion";

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({
  content,
}: ArticleContentProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        prose
        prose-lg
        lg:prose-xl
        prose-slate
        max-w-none

        prose-headings:font-bold
        prose-headings:text-slate-900
        prose-headings:scroll-mt-28

        prose-h2:mt-16
        prose-h2:mb-6
        prose-h2:text-4xl

        prose-h3:mt-12
        prose-h3:mb-5
        prose-h3:text-2xl

        prose-p:text-slate-700
        prose-p:leading-9

        prose-a:text-emerald-600
        prose-a:no-underline
        hover:prose-a:text-emerald-700

        prose-strong:text-slate-900

        prose-img:rounded-3xl
        prose-img:shadow-xl

        prose-ul:space-y-2
        prose-ol:space-y-2

        prose-li:marker:text-emerald-600

        prose-blockquote:border-l-4
        prose-blockquote:border-emerald-500
        prose-blockquote:bg-emerald-50
        prose-blockquote:px-6
        prose-blockquote:py-4
        prose-blockquote:rounded-r-xl
        prose-blockquote:italic

        prose-table:w-full

        prose-th:bg-slate-100
        prose-th:p-3

        prose-td:p-3

        prose-code:rounded
        prose-code:bg-slate-100
        prose-code:px-2
        prose-code:py-1
        prose-code:text-emerald-700

        prose-pre:rounded-2xl
        prose-pre:bg-slate-900
      "
    >
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </motion.article>
  );
}