import {
  Body,
  Container,
  Heading,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { getAppUrl } from "@repo/utils/envs";
import { Footer } from "../components/footer";
import {
  Button,
  EmailThemeProvider,
  getEmailInlineStyles,
  getEmailThemeClasses,
} from "../components/theme";

interface Props {
  post?: {
    id: string;
    author: string;
    title: string;
    url: string;
  };
}

const baseAppUrl = getAppUrl();

export const NewPostEmail = ({
  post = {
    id: "123",
    author: "Jane Doe",
    title: "New Post",
    url: "https://example.com/post/123",
  },
}: Props) => {
  const postLink = `${baseAppUrl}/posts/${post.id}`;
  const themeClasses = getEmailThemeClasses();
  const lightStyles = getEmailInlineStyles("light");

  return (
    <EmailThemeProvider preview={<Preview>New post for you!</Preview>}>
      <Body
        className={`my-auto mx-auto font-sans ${themeClasses.body}`}
        style={lightStyles.body}
      >
        <Container
          className={`my-[40px] mx-auto p-[20px] max-w-[600px] ${themeClasses.container}`}
          style={{
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: lightStyles.container.borderColor,
          }}
        >
          <Heading
            className={`mx-0 my-[30px] p-0 text-[24px] font-normal text-center ${themeClasses.heading}`}
            style={{ color: lightStyles.text.color }}
          >
            Hi there, we've got a new post for you!
          </Heading>

          <Text
            className={`text-[14px] leading-[24px] ${themeClasses.text}`}
            style={{ color: lightStyles.text.color }}
          >
            {post.author} has published a new post:{" "}
            <strong>{post.title}</strong>.
          </Text>
          <Section className="mb-[42px] mt-[32px] text-center">
            <Button href={postLink}>Read now</Button>
          </Section>

          <br />

          <Footer />
        </Container>
      </Body>
    </EmailThemeProvider>
  );
};

export default NewPostEmail;
