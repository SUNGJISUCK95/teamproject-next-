import BoardWriteForm from "../../BoardWriteForm";

export default async function EditPage({ params }) {
    const { pid } = await params;
    return <BoardWriteForm mode="edit" pid={pid} />;
}
