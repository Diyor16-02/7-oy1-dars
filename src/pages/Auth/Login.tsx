import { useContext, useState, type SubmitEvent } from "react";
import { AuthFormItem, Button, ChangeAuthPage, SiteLogo } from "../../components";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "../../context/Context";
import { LoadingWhite } from "../../assets/images";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { setToken } = useContext(Context)

  function handleLoginSubmit(evt: SubmitEvent<HTMLFormElement>) {
    setLoading(true)
    evt.preventDefault()
    const data = {
      email: evt.target.email.value,
      password: evt.target.password.value
    }

    axios.post("https://api.escuelajs.co/api/v1/auth/login", data).then(res => {
      toast.success("Muvaffaqiyatli kirdingiz")
      setTimeout(() => {
        setToken(res.data.access_token)
      }, 1500)
    }).catch(() => toast.error("Bunday foydalanuvchi topilmadi!")).finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-6 text-center">
            <SiteLogo />
            <h1 className="text-2xl font-semibold tracking-tight">Xush kelibsiz</h1>
          </div>
          {/* Card */}
          <div className="rounded-3xl bg-white/5 p-6 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur">
            <form onSubmit={handleLoginSubmit} autoComplete="off">
                <AuthFormItem label="Email" name="email" placeholder="example@gmail.com" type="email" />
                <AuthFormItem labelClass="mt-4" label="Password" name="password" placeholder="********" type="password" />
                <Button extraClass="h-[44px] !mt-3 !flex !items-center !justify-center" type="submit">
                   {loading ? <img className="scale-[1.2]" src={LoadingWhite} alt="Loading" width={30} height={30}/> : "Kirish"}
                </Button>
            </form>
          </div>
          {/* Footer */}
          <ChangeAuthPage title="Hisobingiz yo'qmi?" />
        </div>
      </div>
    </div>
  );
}

export default Login


