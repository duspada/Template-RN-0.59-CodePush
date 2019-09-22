import React, { Component, AsyncStorage } from 'react';
import { ActivityIndicator } from 'react-native';
import CodePush from 'react-native-code-push';

import If from '~/utils/if';
import Redux from '~/store/Redux';
import NavigationService from '~/services/navigation';

import { Title, SubTitle } from './CodePush.styles';
import GlobalButton from '~/components/Button';
import { colors } from '~/styles';

/**
 * Usando o codepush:
 * yarn global add appcenter-cli
 * appcenter login
 * => Copie o código do AppCenter e cole no terminal
 *
 * Liste os aplicativos do AppCenter:
 * appcenter apps list
 *
 * => Se ainda não tiver criado, crie um app no AppCenter, copie o código do
 * "getting started" e cole nos respectivos lugares:
 * "ios/template/AppCenter-Config.plist" => iOS
 * "android/app/src/main/assets/appcenter-config.json" => Android
 *
 * ### OBS: crie um app pra Android, e um para iOS no APPCENTER!
 *
 * Vá na sua aplicação criada no APPCENTER (em ambas), clique em:
 * => Distribute => Codepush => Create standard deployments
 *
 * No terminal, digite:
 * appcenter codepush deployment list -a <usuario>/<app> -k
 * (No meu caso, por exemplo, foi: eduardo.spada-platformbuilders.io/app-teste-android)
 * Esse caminho pode ser visto na URL do appcenter, ao clicar no app criado...
 * Seria algo assim: eduardo.spada-platformbuilders.io/apps/app-teste-android
 * e eu tiro o /apps/
 * ficando: eduardo.spada-platformbuilders.io/app-teste-android

 * ### Configurando o Android:
 * => no arquivo 'android/app/build.gradle' procure por "SUA_CHAVE"
 * => Cole a chave obtida em "Staging" e "Production" - Muito cuidado aqui para não trocar!
 *
 * ### Configurando o IOS:
 * - No seu Mac, abra a aplicação: Keychain Access
 * - No menu, vá em: => KeyChain Access, Certificate Assistant => Request a certificate from a certificate authority
 * - Digite o que foi solicitado, e clique em "save to disk"
 * - Vá no painel de desenvolvedor da apple, em certificates:
 * - Crie um novo certificado de production / App Store and Ad Hoc com esse certificado que acabou de fazer acima
 * - Faça o download e abra o arquivo baixado. Ele irá para sua KeyChain Access.
 * - Clique com o direito, export certificate como P12 (Se não estiver habilitado, de um google de como habilitar)
 * - Digite uma senha segura, você precisará dela no AppCenter - seria bom uma senha padrão builders para minimizar problemas
 *
 * - Em Provisioning Profiles, ainda no Apple Developer, adicione um perfil Development, AdHoc e App Store
 * - Faça download em um lugar seguro, você vai importá-lo no xcode a seguir
 * - No Xcode, unselect o "Automatically manage signing"
 * - Nos provisioning profiles de Debug, Release, Staging coloque as chaves:
 * - Debug: Development
 * - Release: App Store
 * - Staging: AdHoc
 *
 * => no arquivo 'ios/template.xcodeproj/project.pbxproj' procure por "SUA_CHAVE"
 * => Cole a chave obtida em "Staging" e "Release" - Muito cuidado aqui para não trocar!
 *
 * ################ fim configuração ################
 *
 * ### Configurando o AppCenter:
 *
 * - Crie uma branch 'staging', de preferência espelhada com a master, e suba para o repositório
 *
 * => Android:
 * - Vá até o app center, clique no seu aplicativo criado acima, e em Build => Selecione seu Repo
 * - Ele deve ter mapeado os branches Staging e Master
 * - Selecione Staging
 * - Em Build Variant selecione 'ReleaseStaging'
 * - Selecione 'Automatically increment version code'
 * - Selecione a opção 'Sign Builds', e faça o upload da chave fornecida dentro da pasta
 * 'android/keystores/buildersStaging.keystore'
 * - Key alias: buildersStaging
 * - Key password: 123456
 * - Caso deseje criar um novo keystore, segue o comando:
 * - keytool -genkeypair -v -keystore buildersStaging.keystore -alias buildersStaging -keyalg RSA -keysize 2048 -validity 10000
 * - Você pode distribuir automaticamente para colaboradores ou você mesmo, selecionando em 'Distribute Builds'
 * - Salve e teste. Ele deve gerar uma build a cada push no repositório Staging.
 *
 * => IOS:
 * - Vá até o app center, clique no seu aplicativo criado acima, e em Build => Selecione seu Repo
 * - Ele deve ter mapeado os branches Staging e Master
 * - Selecione Staging
 * - Em Shared Scheme selecione 'Staging'
 * - Selecione 'Automatically increment build number'
 * - Selecione a opção 'Sign Builds', e envie os certificados de AdHoc e p12 criados
 * - Você pode distribuir automaticamente para colaboradores ou você mesmo, selecionando em 'Distribute Builds'
 * - Salve e teste. Ele deve gerar uma build a cada push no repositório Staging.
 *
 * ################ fim configuração appcenter ################
 *
 * ### Distribuindo via CodePush:
 *
 * LEMBRE-SE: O CodePush não poderá ser utilizado caso exista uma alteração de código nativo, ou seja,
 * se você instalou alguma dependência que precisou fazer o LINK. Caso isso ocorra, a atualização deverá
 * ser realizada via App Store / Google Play
 *
 * - No terminal, digite a seguinte linha de comando:
 * appcenter codepush release-react -a <usuario>/<app> -d Staging
 * appcenter codepush release-react -a <usuario>/<app> -d Production
 *
 * Ao abrir o seu aplicativo, ele deverá ser atualizado e reiniciado automaticamente!
 */

CodePush.notifyAppReady();
class Root extends Component {
  state = {
    status: 'Aguarde...',
    loading: true,
    percentage: 0,
    showRestart: false,
  };

  async componentDidMount() {
    try {
      await CodePush.sync(
        {
          installMode: CodePush.InstallMode.IMMEDIATE,
          updateDialog: false,
          rollbackRetryOptions: {
            delayInHours: 0.01,
            maxRetryAttempts: 3,
          },
        },
        (status) => {
          switch (status) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
              this.setState({
                status: 'VERIFICANDO UPDATE...',
                loading: true,
                showRestart: false,
              });
              break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
              this.setState({ status: 'BAIXANDO UPDATE...' });
              break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              this.setState({ status: 'INSTALANDO UPDATE...' });
              break;
            case CodePush.SyncStatus.UP_TO_DATE:
              this.setState(
                {
                  status: 'APP ATUALIZADO!',
                  loading: false,
                  showRestart: false,
                },
                () => this.navigate(),
              );
              break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
              this.setState({
                status: 'ATUALIZADO COM SUCESSO',
                loading: false,
                showRestart: true,
              });
              break;
            default:
              this.setState(
                {
                  status: 'TUDO CERTO!',
                  loading: false,
                  showRestart: false,
                },
                () => this.navigate(),
              );
              break;
          }
        },
        ({ receivedBytes, totalBytes }) => {
          this.setState({
            percentage: ((receivedBytes / totalBytes) * 100).toFixed(2),
          });
        },
      );
    } catch (e) {
      this.navigate();
    }
  }

  async navigate() {
    // await AsyncStorage.clear();
    // await AsyncStorage.setItem('@token', '123');
    try {
      const userToken = await AsyncStorage.getItem('@token');
      NavigationService.resetNavigation(userToken ? 'Main' : 'Login');
    } catch (error) {
      NavigationService.resetNavigation('Login');
    }
  }

  render() {
    const {
      status, percentage, showRestart, loading,
    } = this.state;
    return (
      <>
        <Title>{status}</Title>
        <If test={percentage > 0}>
          <SubTitle>{percentage}%</SubTitle>
        </If>
        <If test={loading}>
          <ActivityIndicator size="large" color="white" />
        </If>
        <If test={showRestart}>
          <GlobalButton
            title="Reiniciar o App!"
            color={colors.primary}
            onPress={() => CodePush.restartApp()}
          />
        </If>
      </>
    );
  }
}

export default Redux(Root);
