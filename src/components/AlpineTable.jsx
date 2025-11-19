export default function AlpineTable() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Alpine.js + Tailwind Responsive Table</h1>

        <div
          x-data='function(){
            return {
              query: "",
              sortKey: "name",
              sortAsc: true,
              page: 1,
              perPage: 5,
              items: [
                { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", joined: "2023-01-12" },
                { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Inactive", joined: "2023-03-05" },
                { id: 3, name: "Charlie Lee", email: "charlie@example.com", role: "Viewer", status: "Active", joined: "2022-11-22" },
                { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "Active", joined: "2024-02-10" },
                { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "Editor", status: "Pending", joined: "2024-04-18" },
                { id: 6, name: "Fiona Gallagher", email: "fiona@example.com", role: "Viewer", status: "Active", joined: "2023-08-30" },
                { id: 7, name: "George Miller", email: "george@example.com", role: "Editor", status: "Inactive", joined: "2022-09-14" },
                { id: 8, name: "Hannah Davis", email: "hannah@example.com", role: "Viewer", status: "Active", joined: "2023-12-01" },
                { id: 9, name: "Ian Wright", email: "ian@example.com", role: "Admin", status: "Pending", joined: "2023-05-27" },
                { id: 10, name: "Jasmine Khan", email: "jasmine@example.com", role: "Viewer", status: "Active", joined: "2022-10-09" },
              ],
              get filtered(){
                const q = this.query.toLowerCase().trim();
                if(!q) return this.items;
                return this.items.filter(i =>
                  i.name.toLowerCase().includes(q) ||
                  i.email.toLowerCase().includes(q) ||
                  i.role.toLowerCase().includes(q) ||
                  i.status.toLowerCase().includes(q)
                );
              },
              get sorted(){
                return [...this.filtered].sort((a,b)=>{
                  const ak = a[this.sortKey];
                  const bk = b[this.sortKey];
                  if(ak < bk) return this.sortAsc ? -1 : 1;
                  if(ak > bk) return this.sortAsc ? 1 : -1;
                  return 0;
                });
              },
              get totalPages(){
                return Math.max(1, Math.ceil(this.sorted.length / this.perPage));
              },
              get paginated(){
                const start = (this.page - 1) * this.perPage;
                return this.sorted.slice(start, start + this.perPage);
              },
              setSort(key){
                if(this.sortKey === key){
                  this.sortAsc = !this.sortAsc;
                } else {
                  this.sortKey = key; this.sortAsc = true;
                }
                this.page = 1;
              }
            }
          }()'
          className="bg-white rounded-xl shadow border border-gray-200">

          <div className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <input x-model="query" type="text" placeholder="Search..." className="w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Rows:</label>
              <select x-model.number="perPage" className="rounded-lg border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" x-on:click="setSort('name')">
                    <div className="flex items-center gap-1">Name
                      <span x-show="sortKey==='name'" className="text-gray-400" x-text="sortAsc ? '▲' : '▼'"></span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" x-on:click="setSort('email')">
                    <div className="flex items-center gap-1">Email
                      <span x-show="sortKey==='email'" className="text-gray-400" x-text="sortAsc ? '▲' : '▼'"></span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" x-on:click="setSort('role')">
                    <div className="flex items-center gap-1">Role
                      <span x-show="sortKey==='role'" className="text-gray-400" x-text="sortAsc ? '▲' : '▼'"></span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" x-on:click="setSort('status')">
                    <div className="flex items-center gap-1">Status
                      <span x-show="sortKey==='status'" className="text-gray-400" x-text="sortAsc ? '▲' : '▼'"></span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" x-on:click="setSort('joined')">
                    <div className="flex items-center gap-1">Joined
                      <span x-show="sortKey==='joined'" className="text-gray-400" x-text="sortAsc ? '▲' : '▼'"></span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <template x-for="user in paginated" :key="user.id">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900" x-text="user.name"></div>
                      <div className="text-sm text-gray-500 sm:hidden" x-text="user.email"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900" x-text="user.email"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800" x-text="user.role"></span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                        x-bind:class="{
                          'bg-green-100 text-green-800': user.status==='Active',
                          'bg-yellow-100 text-yellow-800': user.status==='Pending',
                          'bg-gray-100 text-gray-800': user.status==='Inactive'
                        }"
                        x-text="user.status"></span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900" x-text="user.joined"></div>
                    </td>
                  </tr>
                </template>

                <tr x-show="paginated.length===0">
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No results found.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              <span x-text="sorted.length"></span> results • Page <span x-text="page"></span> of <span x-text="totalPages"></span>
            </p>
            <div className="inline-flex items-center gap-2">
              <button className="px-3 py-2 rounded-md border text-sm disabled:opacity-50" x-bind:disabled="page===1" x-on:click="page = Math.max(1, page-1)">Previous</button>
              <button className="px-3 py-2 rounded-md border text-sm disabled:opacity-50" x-bind:disabled="page===totalPages" x-on:click="page = Math.min(totalPages, page+1)">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
