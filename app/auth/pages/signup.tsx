import { BlitzPage, Routes, useRouter } from 'blitz'

import { SignupForm } from 'app/auth/components/SignupForm'
import Layout from 'app/core/layouts/Layout'

const SignupPage: BlitzPage = () => {
    const router = useRouter()

    return (
        <div>
            <SignupForm onSuccess={() => router.push(Routes.Home())} />
        </div>
    )
}

SignupPage.redirectAuthenticatedTo = '/'
SignupPage.getLayout = (page) => <Layout title='Sign Up'>{page}</Layout>

export default SignupPage
