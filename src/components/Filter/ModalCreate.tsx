import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Modal from "@/ui/Modal";
import Select from "@/ui/Select";
import { schemaLogin } from "@/utils/ValidationSchema";
import { Formik } from "formik";

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
];

interface IProps {
  setModalOpen: (updater: (prev: boolean) => boolean) => void;
}

const ModalCreate = ({ setModalOpen }: IProps) => {
  return (
    <Modal title="Tambah Buku" setModalOpen={setModalOpen}>
      <Formik
        initialValues={{
          judul: "",
          penulis: "",
          isbn: "",
          cover: "",
          kategori: "",
          status: "",
        }}
        validationSchema={schemaLogin}
        onSubmit={(values, { setSubmitting }) => {
          console.log("submit");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
          /* and other goodies */
        }) => {
          const handleSelectChange = (
            event: React.ChangeEvent<HTMLSelectElement>
          ) => {
            setFieldValue("kategori", event.target.value);
          };
          return (
            <form className="w-full mx-auto" onSubmit={handleSubmit}>
              <Input
                title="Judul"
                type="text"
                name="judul"
                placeholder="Input Your Email"
                value={values.judul}
                error={errors.judul && touched.judul ? errors.judul : ""}
                onChange={handleChange}
              />
              <Input
                title="Penulis"
                type="text"
                name="penulis"
                placeholder="Input Your Email"
                value={values.penulis}
                error={errors.penulis && touched.penulis ? errors.penulis : ""}
                onChange={handleChange}
              />
              <Input
                title="ISBN"
                type="text"
                name="isbn"
                placeholder="Input Your Email"
                value={values.isbn}
                error={errors.isbn && touched.isbn ? errors.isbn : ""}
                onChange={handleChange}
              />
              <Select
                title="Kategori"
                id="kategori"
                name="kategori"
                options={countries}
                placeholder="Pilih Kategori"
                value={values.kategori}
                onChange={handleSelectChange}
              />
              <Select
                title="Status Baca"
                id="status"
                name="status"
                options={countries}
                placeholder="Pilih Kategori"
                value={values.status}
                onChange={handleSelectChange}
              />
              <Input
                title="Cover Image"
                type="file"
                name="cover"
                placeholder="Input Your Email"
                value={values.cover}
                error={errors.cover && touched.cover ? errors.cover : ""}
                onChange={handleChange}
              />
              <Button title={"Submit"} type="submit" />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ModalCreate;
