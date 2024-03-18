import { Inter } from "next/font/google";
import { Button, Container, MainContainer, Text } from "@libs/components";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  return (
    <MainContainer
      className={`w-full min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <Container className="bg-purple-100 h-screen flex flex-col justify-center items-center">
        <Text className="text-purple-700 text-4xl font-bold mb-8">
          Welcome to Quizzi
        </Text>
        <Text>
          Embark on your quiz journey today! Start creating and conquering
          quizzes with us.
        </Text>

        <Button
          className="mt-8 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
          onClick={() => router.push("/quiz/list")}
        >
          Let's Get Started{" "}
        </Button>
      </Container>
    </MainContainer>
  );
}
