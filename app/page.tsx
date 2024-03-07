import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q?: string };
}) {
  const search = searchParams.q ?? '';
  let result;

  if (search) {
    result = await sql`
      SELECT id, name, username, email 
      FROM users 
      WHERE name ILIKE ${'%' + search + '%'}
    `;
  } else {
    result = await sql`
      SELECT id, name, username, email 
      FROM users
    `;
  }

  const users = result.rows as User[];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl text-[#7a501d] bg-[#3f3731]">
      <Title className='text-black text-2xl font-bold h-9 text-9xl text-[#286598]'>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-9 pl-9 pb-9 pt-9 text-[#ccb394]">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
