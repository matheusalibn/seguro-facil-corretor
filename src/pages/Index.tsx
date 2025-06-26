
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileText, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Seguros
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plataforma completa para corretores de seguros gerenciarem clientes e formulários
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Formulário</CardTitle>
              <CardDescription>
                Cadastro de novos clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Link to="/client-form">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Acessar Formulário
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Login Corretor</CardTitle>
              <CardDescription>
                Acesso para corretores
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Link to="/login">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Fazer Login
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Dashboard</CardTitle>
              <CardDescription>
                Painel do corretor
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Link to="/dashboard">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Ver Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
