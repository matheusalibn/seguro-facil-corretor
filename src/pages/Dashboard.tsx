
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Search, 
  Plus, 
  LogOut, 
  Users, 
  FileText, 
  Link as LinkIcon,
  Eye
} from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [corretorData, setCorretorData] = useState<any>(null);

  // Dados simulados de clientes
  const [clientes] = useState([
    {
      id: 1,
      nome: "Maria Silva Santos",
      cpf: "123.456.789-01",
      email: "maria@email.com",
      telefone: "(11) 99999-1234",
      status: "Ativo",
      dataFormulario: "2024-06-25"
    },
    {
      id: 2,
      nome: "João Oliveira",
      cpf: "234.567.890-12",
      email: "joao@email.com",
      telefone: "(11) 88888-5678",
      status: "Pendente",
      dataFormulario: "2024-06-24"
    },
    {
      id: 3,
      nome: "Ana Costa",
      cpf: "345.678.901-23",
      email: "ana@email.com",
      telefone: "(11) 77777-9012",
      status: "Ativo",
      dataFormulario: "2024-06-23"
    }
  ]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("corretorData");
    
    if (!isLoggedIn || !userData) {
      toast.error("Acesso negado. Faça login primeiro.");
      navigate("/login");
      return;
    }
    
    setCorretorData(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("corretorData");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  const handleGenerateLink = () => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/client-form`;
    navigator.clipboard.writeText(link);
    toast.success("Link copiado para a área de transferência!");
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpf.includes(searchTerm)
  );

  if (!corretorData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Corretor</h1>
                <p className="text-sm text-gray-600">Bem-vindo, {corretorData.nome}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  Página Inicial
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientes.length}</div>
              <p className="text-xs text-muted-foreground">Clientes cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Formulários Ativos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientes.filter(c => c.status === 'Ativo').length}</div>
              <p className="text-xs text-muted-foreground">Em andamento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientes.filter(c => c.status === 'Pendente').length}</div>
              <p className="text-xs text-muted-foreground">Aguardando análise</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Gere links personalizados e gerencie formulários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleGenerateLink}
                className="bg-green-600 hover:bg-green-700"
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                Gerar Link de Formulário
              </Button>
              <Link to="/client-form">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Formulário Manual
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Search and Table */}
        <Card>
          <CardHeader>
            <CardTitle>Consulta de Clientes</CardTitle>
            <CardDescription>
              Busque e visualize informações dos clientes cadastrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome ou CPF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Formulário</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClientes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        {searchTerm ? "Nenhum cliente encontrado" : "Nenhum cliente cadastrado"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredClientes.map((cliente) => (
                      <TableRow key={cliente.id}>
                        <TableCell className="font-medium">{cliente.nome}</TableCell>
                        <TableCell>{cliente.cpf}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{cliente.email}</div>
                            <div className="text-gray-500">{cliente.telefone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={cliente.status === 'Ativo' ? 'default' : 'secondary'}
                            className={cliente.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          >
                            {cliente.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(cliente.dataFormulario).toLocaleDateString('pt-BR')}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
