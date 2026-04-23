import { createFileRoute } from "@tanstack/react-router";
import { Bell, Download, Play, Sparkles } from "lucide-react";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/core/components/ui/alert";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import { Progress } from "@/core/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/core/components/ui/select";
import { Separator } from "@/core/components/ui/separator";
import { Switch } from "@/core/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/core/components/ui/table";

export const Route = createFileRoute("/design-system")({
	component: DesignSystemRoute,
});

function DesignSystemRoute() {
	return (
		<main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
			<header className="flex flex-col gap-3">
				<Badge variant="outline" className="w-fit">
					CineDash UI
				</Badge>
				<h1 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
					Design system base com Shadcn
				</h1>
				<p className="max-w-3xl text-sm text-muted-foreground md:text-base">
					Paleta, tipografia e componentes padronizados para acelerar telas do
					produto com consistencia visual.
				</p>
			</header>

			<Alert>
				<Sparkles />
				<AlertTitle>Foundation pronta</AlertTitle>
				<AlertDescription>
					Tokens de cor, contraste e componentes base foram definidos para
					desktop e mobile.
				</AlertDescription>
			</Alert>

			<section className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Buttons</CardTitle>
						<CardDescription>
							Estados principais para acao primaria e secundaria.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-wrap gap-2">
						<Button>
							<Play data-icon="inline-start" />
							Assistir
						</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="outline">Outline</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Badges</CardTitle>
						<CardDescription>
							Selo de status para catalogo e metadados.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-wrap gap-2">
						<Badge>Now Playing</Badge>
						<Badge variant="secondary">Documentary</Badge>
						<Badge variant="outline">Top Rated</Badge>
						<Badge variant="destructive">Restricted</Badge>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Switches</CardTitle>
						<CardDescription>
							Preferencias globais com feedback imediato.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-3">
						<div className="flex items-center justify-between rounded-lg border border-border p-3">
							<div className="flex flex-col gap-0.5">
								<span className="text-sm font-medium">Notificacoes</span>
								<span className="text-xs text-muted-foreground">
									Receber alertas de novos lancamentos
								</span>
							</div>
							<Switch defaultChecked />
						</div>
						<div className="flex items-center justify-between rounded-lg border border-border p-3">
							<div className="flex flex-col gap-0.5">
								<span className="text-sm font-medium">Autoplay trailers</span>
								<span className="text-xs text-muted-foreground">
									Iniciar videos automaticamente
								</span>
							</div>
							<Switch size="sm" />
						</div>
					</CardContent>
				</Card>
			</section>

			<section className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
				<Card>
					<CardHeader>
						<CardTitle>Form Controls</CardTitle>
						<CardDescription>
							Campos para busca e filtros do catalogo.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-3">
						<Input placeholder="Buscar titulo, ator ou genero" />
						<div className="grid gap-3 sm:grid-cols-2">
							<Select defaultValue="all">
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Genero" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Generos</SelectLabel>
										<SelectItem value="all">Todos</SelectItem>
										<SelectItem value="drama">Drama</SelectItem>
										<SelectItem value="thriller">Thriller</SelectItem>
										<SelectItem value="comedy">Comedia</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<Select defaultValue="trending">
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Ordenar" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Ordenacao</SelectLabel>
										<SelectItem value="trending">Trending</SelectItem>
										<SelectItem value="rating">Melhor nota</SelectItem>
										<SelectItem value="recent">Mais recentes</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</CardContent>
					<CardFooter className="justify-between">
						<Button variant="outline">Limpar filtros</Button>
						<Button>
							<Bell data-icon="inline-start" />
							Aplicar
						</Button>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Progress</CardTitle>
						<CardDescription>
							Uso para upload, jobs e consumo de API.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<span>Assets</span>
								<span>32%</span>
							</div>
							<Progress value={32} />
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<span>Metadados</span>
								<span>68%</span>
							</div>
							<Progress value={68} />
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<span>Cache global</span>
								<span>91%</span>
							</div>
							<Progress value={91} />
						</div>
					</CardContent>
				</Card>
			</section>

			<Card>
				<CardHeader>
					<CardTitle>Table</CardTitle>
					<CardDescription>
						Componente base para listas e visualizacao de dados.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Titulo</TableHead>
								<TableHead>Categoria</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Score</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="font-medium">The Quiet Horizon</TableCell>
								<TableCell>Drama</TableCell>
								<TableCell>
									<Badge variant="secondary">Published</Badge>
								</TableCell>
								<TableCell className="text-right">8.7</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">Neon District</TableCell>
								<TableCell>Sci-Fi</TableCell>
								<TableCell>
									<Badge variant="outline">Draft</Badge>
								</TableCell>
								<TableCell className="text-right">7.9</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">Echoes of Water</TableCell>
								<TableCell>Documentary</TableCell>
								<TableCell>
									<Badge>Featured</Badge>
								</TableCell>
								<TableCell className="text-right">9.1</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className="justify-between">
					<span className="text-xs text-muted-foreground">
						Atualizado ha 2 minutos
					</span>
					<Button variant="outline">
						<Download data-icon="inline-start" />
						Exportar
					</Button>
				</CardFooter>
			</Card>

			<Separator />

			<footer className="pb-4 text-xs text-muted-foreground">
				Foundation pronta para escalar componentes de features em
				`src/modules/*` com o mesmo vocabulario visual.
			</footer>
		</main>
	);
}
