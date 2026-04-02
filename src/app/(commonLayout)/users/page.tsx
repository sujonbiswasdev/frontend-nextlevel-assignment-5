import { getAllUsersAction } from '@/actions/user.actions';
import ErrorBoundary from '@/components/ErrorBoundary'
import UserTable from '@/components/module/user/UserTable';
import NotFoundItem from '@/components/NotFoundItem';
import React from 'react'

const UsersPage =async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  let usersResponse;
  try {
    const search = await searchParams;
    usersResponse = await getAllUsersAction(search, { cache: "no-store" });
  } catch (err) {
    console.error("Users fetch error:", err);
    usersResponse = { data: [], pagination: { total: 0, page: 1, limit: 10, totalpage: 1 } };
  }

  console.log(usersResponse,'usrere')
  
  return (
    <React.Suspense fallback={<span>Loading users...</span>}>
      <ErrorBoundary fallback={<span>Something went wrong while loading users.</span>}>
        <div>
         {!usersResponse || !usersResponse.success || !usersResponse?.users  ? (
            <ul>
             <NotFoundItem content="No users found." emoji="😕" filter="" key="no-users"/>
            </ul>
          ) : (
            <UserTable/>
          )}
        </div>
      </ErrorBoundary>
    </React.Suspense>
  )
}

export default UsersPage