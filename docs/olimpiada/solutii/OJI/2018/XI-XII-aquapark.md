---
id: OJI-2018-XI-XII-aquapark
title: Soluția problemei aquapark (OJI 2018, clasele XI-XII)
problem_id: 25
authors: [budau, zoltan]
prerequisites:
    - graphs
    - cuplaj-maxim-pe-graf-bipartit
tags:
    - OJI
    - clasa XI-XII
---
Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/11-12/aquapark.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/11-12/aquapark.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/11-12/aquapark.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: andrei_C1 (kilonova)
#include <bits/stdc++.h>

using namespace std;

int main() {
	ifstream fin("aquapark.in");
	ofstream fout("aquapark.out");
	int c, n, m;
	fin >> c >> n >> m;
	struct edge_t {
		int x, y;
		edge_t() {}
		edge_t(int x, int y): x(x), y(y) {}
		void norm() {
			if(x > y) {
				swap(x, y);
			}
		}
	};
	vector<edge_t> edges;
	struct event_t {
		int x, y;
		bool ins;
		int id;
		event_t() {}
		event_t(int x, int y, bool ins, int id): x(x), y(y), ins(ins), id(id) {}
		bool operator <(const event_t &oth) const {
			if(x == oth.x) {
				if(ins == oth.ins) {
					return y > oth.y;
				}
				return ins < oth.ins;
			}
			return x < oth.x;
		}
	};
	vector<event_t> events;
	for(int i = 0; i < m; i++) {
		int x, y;
		fin >> x >> y;
		x--; y--;
		edges.emplace_back(x, y);
		edges[i].norm();
		events.emplace_back(edges[i].x, edges[i].y, true, edges.size() - 1);
		events.emplace_back(edges[i].y, edges[i].x, false, edges.size() - 1);
	}
	sort(events.begin(), events.end());
	vector<int> st;
	vector<vector<int>> adj(m);
	for(const auto &[x, y, ins, id]: events) {
		if(ins) {
			st.emplace_back(id);
		} else {
			int lst = -1;
			while(!st.empty() && edges[id].x < edges[st.back()].x) {
				lst = st.back();
				adj[id].emplace_back(lst);
				adj[lst].emplace_back(id);
				st.pop_back();
			}
			if(!st.empty() && st.back() == id) {
				st.pop_back();
			}
			if(lst != -1) {
				st.push_back(lst);
			}
		}
	}
	const int kNil = -1;
	vector<int> col(m, kNil);
	auto dfs = [&](auto &&self, int u, bool c = 0) -> void {
		col[u] = c;
		for(const auto &it: adj[u]) if(col[it] == kNil) {
			self(self, it, !c);
		}
	};
	const int kMod = 666013;
	int cnt = 1;
	for(int i = 0; i < m; i++) {
		if(col[i] == kNil) {
			cnt += cnt;
			if(cnt >= kMod) {
				cnt -= kMod;
			}
			dfs(dfs, i);
		}
	}
	if(c == 1) {
		for(int i = 0; i < m; i++) {
			fout << edges[i].x + 1 << " " << edges[i].y + 1 << " " << col[i] + 1 << '\n';
		}
	} else {
		fout << cnt;
	}
	return 0;
}
```
