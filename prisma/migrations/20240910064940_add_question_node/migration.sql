-- CreateTable
CREATE TABLE "QuestionNode" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "apiKey" TEXT NOT NULL,

    CONSTRAINT "QuestionNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "nextQuestionId" INTEGER,
    "questionNodeId" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionNode" ADD CONSTRAINT "QuestionNode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionNode" ADD CONSTRAINT "QuestionNode_apiKey_fkey" FOREIGN KEY ("apiKey") REFERENCES "ApiKey"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionNodeId_fkey" FOREIGN KEY ("questionNodeId") REFERENCES "QuestionNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
