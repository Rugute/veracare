import CoprateSignUpForm from "@/Modules/Auth/Ui/CoprateForm";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <CoprateSignUpForm id={id} />
    </div>
  );
};

export default page;
