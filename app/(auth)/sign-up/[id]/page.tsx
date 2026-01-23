import CoprateSignUpForm from "@/Modules/Auth/Ui/CoprateForm";

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ id: string }>;
}

const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { name } = await searchParams;
  return (
    <div>
      <CoprateSignUpForm id={id} name={name || ""} />
    </div>
  );
};

export default page;
