import React from 'react';
import { motion } from 'framer-motion';
import { Skull, Ghost, HelpCircle, Film, PackageOpen } from 'lucide-react';
import './index.css';

const Section = ({ title, icon: Icon, children, delay = 0 }) => (
  <motion.div 
    className="glass-panel"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
  >
    <h2><Icon className="inline-block mr-3 mb-2" size={32} color="#8b0000" /> {title}</h2>
    {children}
  </motion.div>
);

function App() {
  return (
    <div className="min-h-screen">
      <div className="blood-drip"></div>
      
      <header className="pt-20 pb-10 text-center">
        <motion.h1 
          className="flicker-text"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          ANNABELLE
        </motion.h1>
        <p className="text-xl italic text-gray-400">"Positively Do Not Open"</p>
      </header>

      <main className="container mx-auto px-4 pb-20">
        
        <Section title="A Verdadeira Origem" icon={Skull} delay={0.2}>
          <div className="grid-2">
            <div>
              <p>
                Ao contrário da assustadora boneca de porcelana vista nos cinemas, a verdadeira Annabelle era, na verdade, uma boneca comum da linha <strong>Raggedy Ann</strong>, um clássico brinquedo de pano americano com cabelos de lã vermelha e um nariz triangular.
              </p>
              <p>
                A história conta que, em 1970, a boneca foi dada de presente por uma mãe à sua filha, Donna, uma estudante de enfermagem que dividia um apartamento com sua amiga Angie. Pouco tempo depois de ganhar o presente, coisas estranhas começaram a acontecer. A boneca parecia se mover sozinha, mudando de posição e de cômodo, e bilhetes com mensagens como "Ajude-nos" ("Help Us") começaram a aparecer.
              </p>
              <p>
                Após chamarem uma médium, as amigas foram informadas de que a boneca abrigava o espírito de uma menina de sete anos chamada <strong>Annabelle Higgins</strong>, cujo corpo havia sido encontrado anos antes onde o prédio foi construído. 
              </p>
            </div>
            <div className="image-container">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Annabelle_doll.jpg" 
                alt="A verdadeira boneca Annabelle no museu dos Warren" 
              />
              <p className="text-sm text-center mt-2 italic text-gray-500">A verdadeira boneca Annabelle trancada no Museu dos Warren.</p>
            </div>
          </div>
        </Section>

        <Section title="Real ou Falsa?" icon={HelpCircle} delay={0.3}>
          <p>
            A veracidade da história de Annabelle é motivo de intenso debate. Para os demonologistas Ed e Lorraine Warren, que foram chamados para investigar o caso após a situação fugir do controle, a boneca não estava possuída por uma garotinha, mas sim sendo manipulada por uma <strong>entidade demoníaca inumana</strong> que usava a história da menina como fachada para tentar possuir um hospedeiro humano.
          </p>
          <p>
            Céticos e investigadores independentes frequentemente apontam que não existem evidências concretas, além dos relatos dos próprios Warren e das donas originais, de que os eventos sobrenaturais tenham ocorrido. Muitos acreditam que os Warren exageraram ou fabricaram histórias para promover suas carreiras e seu Museu do Ocultismo.
          </p>
          <p>
            Verdade ou mito, a boneca foi considerada perigosa o suficiente pelos Warren para ser trancada em uma caixa de vidro benzida com a placa: <em>"Aviso: Positivamente não abra"</em>.
          </p>
        </Section>

        <Section title="Casos Paranormais Relacionados" icon={Ghost} delay={0.4}>
          <div className="grid-2">
            <div className="image-container">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/07/Ed_and_Lorraine_Warren.jpg" 
                alt="Ed e Lorraine Warren" 
              />
              <p className="text-sm text-center mt-2 italic text-gray-500">Os demonologistas Ed e Lorraine Warren.</p>
            </div>
            <div>
              <p>
                Além dos ataques relatados no apartamento de Donna (como o amigo Lou acordando com marcas de garras no peito após um pesadelo com a boneca), os Warren relataram diversos incidentes relacionados a Annabelle:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>O Padre Cético:</strong> Um padre que visitou os Warren desdenhou da boneca dizendo "Você é apenas uma boneca de pano, não pode machucar ninguém". No caminho de volta, os freios de seu carro falharam e ele sofreu um grave acidente, sobrevivendo por pouco.</li>
                <li className="mb-2"><strong>O Motociclista Desafiador:</strong> Um visitante do museu ignorou os avisos e bateu no vidro da caixa de Annabelle desafiando-a. Ed Warren o expulsou do local. Horas depois, o jovem perdeu o controle de sua moto e bateu em uma árvore, falecendo no local.</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="A Boneca dos Filmes vs A Real" icon={Film} delay={0.5}>
          <div className="grid-2">
            <div>
              <p>
                Quando James Wan criou o universo de <em>Invocação do Mal</em> (The Conjuring), os direitos de imagem da boneca Raggedy Ann pertenciam à Hasbro. Além disso, Wan achava que uma boneca de pano não passava a aura de terror necessária para um filme de Hollywood.
              </p>
              <p>
                Por isso, a Annabelle cinematográfica foi criada como uma <strong>boneca de porcelana sinistra e vitoriana</strong>, com olhos mortos e o rosto rachado. Enquanto a original é fofinha e esconde o mal em uma aparência inocente, a do filme já causa arrepios à primeira vista.
              </p>
              <p>
                A Annabelle dos filmes também possui uma história de origem completamente diferente (mostrada em <em>Annabelle 2: A Criação do Mal</em>), onde ela foi criada por um fabricante de bonecas cuja filha havia falecido tragicamente.
              </p>
            </div>
            <div className="image-container">
              <img 
                src="https://m.media-amazon.com/images/M/MV5BOTQwZmQyYzEtODk5ZC00OTY3LWExMjAtYzRjNWFhNGM3MzBlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg" 
                alt="A boneca Annabelle dos filmes" 
              />
              <p className="text-sm text-center mt-2 italic text-gray-500">A aterrorizante boneca de porcelana desenhada para os cinemas.</p>
            </div>
          </div>
        </Section>

        <Section title="Produtos e Outras Bonecas" icon={PackageOpen} delay={0.6}>
          <p>
            <strong>A Inspiração:</strong> A verdadeira Annabelle é da linha <em>Raggedy Ann</em>, criada pelo escritor Johnny Gruelle em 1915 para sua filha, Marcella. A boneca se tornou um ícone infantil e gerou inúmeros livros infantis, sendo uma boneca associada ao amor e à bondade.
          </p>
          <p>
            <strong>Merchandising do Filme:</strong> Com o sucesso da franquia de terror da Warner Bros., a nova aparência aterrorizante de Annabelle gerou sua própria linha massiva de produtos. Existem action figures da NECA, bonecas em tamanho real vendidas pela Mezco Toyz e réplicas exatas licenciadas vendidas por centenas de dólares para colecionadores.
          </p>
          <p>
            A ironia é que a imagem de uma boneca originalmente fofa agora foi sobreposta pela imagem de uma das bonecas mais assustadoras da cultura pop, criando duas "linhagens" completamente distintas para o mesmo nome na mente do público.
          </p>
        </Section>

      </main>

      <footer className="text-center py-8 border-t border-red-900 bg-black">
        <p className="text-gray-500">"Não a desafie. O mal contido aqui é real."</p>
        <p className="text-sm mt-2 text-gray-700">Desenvolvido sob o comando de Antigravity OpenClaw.</p>
      </footer>
    </div>
  );
}

export default App;
